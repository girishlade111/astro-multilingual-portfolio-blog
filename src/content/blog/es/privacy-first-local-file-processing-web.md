---
title: "Privacidad por arquitectura: procesando PDFs e imágenes en el cliente y sin servidores"
description: "Por qué subir documentos privados a convertidores en la nube es un riesgo innecesario, y cómo LS PDF y LS Image Compressor procesan tus archivos al 100% en la memoria de tu navegador."
pubDate: "2026-10-30"
readingTime: 6
category: "Arquitectura Web · Seguridad"
slug: "privacy-first-local-file-processing-web"
lang: "es"
---

Todos los días, millones de personas suben extractos bancarios, informes médicos, documentos de identidad, contratos confidenciales y fotografías privadas a convertidores online supuestamente «gratuitos». Lo hacen para resolver problemas cotidianos: unir dos archivos PDF, reducir el peso de una imagen para un portal de empleo o girar un recibo escaneado.

La mayoría asume que, en cuanto se descarga el archivo resultante, el documento desaparece por arte de magia. Sin embargo, desde una perspectiva de ingeniería, en cuanto un archivo toca el disco de un servidor ajeno, cualquier garantía de privacidad queda en entredicho: se hacen copias de seguridad automáticas, los directorios temporales tardan en purgarse, los registros de acceso guardan metadatos y los servidores en la nube pueden ser vulnerados o estar mal configurados.

Cuando diseñé **LS PDF** (`pdf.ladestack.in`) y **LS Image Compressor** (`img.ladestack.in`) dentro del ecosistema **LadeStack**, decidí adoptar una postura arquitectónica sin concesiones: **la mejor manera de proteger los datos de un usuario es no recibirlos jamás.**

## El cambio de paradigma: computación del lado del cliente

Históricamente, los navegadores carecían de la potencia necesaria para analizar formatos binarios complejos como el PDF o manipular matrices de píxeles pesadas. Esas tareas se delegaban forzosamente a utilidades de servidor como ImageMagick, Ghostscript o Poppler.

Hoy esa arquitectura ha quedado obsoleta para las operaciones cotidianas. Con los motores de JavaScript optimizando arrays tipados, WebAssembly ejecutando código a velocidad casi nativa y la API Canvas de HTML5 ofreciendo aceleración gráfica por hardware, el navegador puede procesar cualquier documento directamente en tu máquina.

```text
[Flujo Tradicional en la Nube]
Archivo -> Subida por Internet -> Servidor Remoto -> Backend -> Descarga por Internet
(Lento, costoso en ancho de banda, alto riesgo de privacidad)

[Arquitectura LadeStack]
Archivo -> ArrayBuffer en RAM local -> Web Worker / Canvas -> URL Blob Local
(Sin subidas, ejecución instantánea, privacidad absoluta)
```

## Las tripas de LS PDF: 17 funciones en la memoria local

**LS PDF** se apoya en dos grandes bibliotecas que corren enteramente en el cliente: **PDF.js** (para renderizado y extracción de texto) y **pdf-lib** (para modificar, unir, dividir y generar flujos de bytes PDF).

### 1. Unir y dividir sin tocar internet

Cuando unes tres archivos PDF en LS PDF:
1. Seleccionas los archivos mediante la API estándar de archivos de HTML5.
2. Los documentos se cargan en la memoria RAM como instancias de `ArrayBuffer` mediante `FileReader.readAsArrayBuffer()`.
3. `PDFDocument.load()` analiza la estructura de cada archivo directamente en tu navegador.
4. Las páginas elegidas se copian a un nuevo documento mediante `newDoc.copyPages(sourceDoc, indices)`.
5. El PDF unificado se serializa en un array `Uint8Array`, se transforma en un objeto URL mediante `URL.createObjectURL(new Blob([...]))` y se descarga en tu disco de inmediato.

Todo este proceso tarda menos de 200 milisegundos en un ordenador corriente. Ni un solo byte viaja por la red.

### 2. Evitar bloqueos de pantalla con Web Workers

Analizar documentos PDF con cientos de trazados vectoriales e imágenes incrustadas puede sobrecargar el hilo principal del navegador. Si la pantalla se bloquea por más de 50 milisegundos, el desplazamiento se entrecorta y el navegador muestra avisos de página no responsiva.

Para garantizar una experiencia fluida a 60 fotogramas por segundo, LS PDF delega las tareas pesadas a **Web Workers** en segundo plano:

```typescript
// Envío de bytes a un hilo secundario sin duplicar memoria
const worker = new Worker('/workers/pdf-worker.js');
const buffer = await file.arrayBuffer();

worker.postMessage({ action: 'EXTRACT_TEXT', buffer }, [buffer]);
```

Al pasar el búfer como objeto transferible (Transferable Object), la propiedad de la memoria se cede al hilo secundario al instante sin realizar copias costosas. Una vez procesado, el resultado vuelve limpiamente a la interfaz.

## Las tripas de LS Image Compressor: manipulación directa en Canvas

En **LS Image Compressor**, evitamos cualquier llamada a APIs remotas de compresión aprovechando la aceleración gráfica de la **API Canvas de HTML5**.

### 1. Escalado de dimensiones y cálculo de compresión

Cuando arrastras una imagen a la herramienta:
1. El archivo se decodifica en un `ImageBitmap` fuera del hilo principal.
2. Calculamos las nuevas dimensiones proporcionales según los límites de ancho y alto indicados.
3. Dibujamos la imagen sobre un lienzo `OffscreenCanvas` aplicando remuestreo bicúbico.
4. Generamos el resultado optimizado llamando a `.convertToBlob({ type: 'image/webp', quality })`.

Si indicas un tamaño de archivo exacto (por ejemplo: «dejar esta foto de 4 MB por debajo de 200 KB para un formulario oficial»), el compresor ejecuta un algoritmo de búsqueda binaria. Ajusta la calidad de compresión entre 0,1 y 1,0 en 3 o 4 iteraciones rápidas hasta clavar el peso requerido.

### 2. Adiós a las filtraciones de imágenes

Muchas herramientas comerciales te piden pegar enlaces o subir tus fotos a sus servidores. Al mantener todo en local, puedes pegar directamente capturas o fotos confidenciales desde el portapapeles (`Ctrl+V`) sin miedo a que terminen en bases de datos ajenas.

## Ventajas económicas y éticas

Diseñar aplicaciones web para que se ejecuten en el cliente crea un beneficio mutuo que las empresas tradicionales de software suelen rechazar:

- **Coste cero de infraestructura**: Como el procesamiento se hace con la CPU del usuario, en LadeStack no pagamos servidores gigantescos ni facturas millonarias de ancho de banda. Esto nos permite mantener las herramientas totalmente gratuitas y sostenibles en el tiempo.
- **Privacidad demostrable, no prometida**: No necesitamos redactar una política de privacidad de 40 páginas asegurando que «cuidamos tus datos». Nuestra arquitectura hace matemáticamente imposible que podamos ver tus archivos.
- **Funcionamiento sin conexión**: Dado que el código se almacena en la caché del navegador, una vez cargada la página puedes utilizar las herramientas incluso sin conexión a internet.

La privacidad no debería ser una función de pago reservada a planes corporativos. Aprovechando la potencia real de los navegadores, podemos construir utilidades que son más rápidas, más baratas y mucho más seguras para todos.

