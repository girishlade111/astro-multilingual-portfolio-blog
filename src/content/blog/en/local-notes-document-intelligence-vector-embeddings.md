---
title: "Document Intelligence: Running Local Vector Search and Embeddings in the Browser"
description: "How we implemented in-browser semantic vector retrieval using WebAssembly, quantized transformer models, and cosine similarity with zero server dependencies."
pubDate: "2026-11-05"
readingTime: 6
category: "Prototypes"
slug: "local-notes-document-intelligence-vector-embeddings"
lang: "en"
tags: ["vector-search", "embeddings", "wasm", "knowledge-graphs"]
tool: "Document Intelligence"
---

Personal notes, meeting transcripts, and engineering logs contain our most sensitive intellectual property. Yet most "AI note-taking" applications force users to synchronize their entire knowledge base to third-party cloud servers so an OpenAI API can compute embeddings.

In the LadeStack R&D prototypes, I explored an alternative: **can a web browser compute vector embeddings and perform semantic similarity search entirely on the client?**

The answer is yes.

## Quantized Transformers via ONNX Web

Thanks to ONNX Runtime Web and quantized sentence embedding models (such as `all-MiniLM-L6-v2` compressed to ~23MB in 8-bit precision), modern laptops and mobile phones can generate 384-dimensional dense vectors in under 15 milliseconds.

```typescript
export function cosineSimilarity(vecA: Float32Array, vecB: Float32Array): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  return denominator === 0 ? 0 : dot / denominator;
}
```

## Fast Semantic Retrieval with Local Indices

When a user writes a new note:
1. The note text is tokenized and passed to the local WebAssembly model.
2. The resulting 384-element float array is indexed in an IndexedDB object store alongside raw text.
3. When searching, the query embedding is compared against the stored vectors in memory using dot-product SIMD vector acceleration.

A private, intelligent second brain that never leaves your device.
