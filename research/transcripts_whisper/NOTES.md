# Whisper runs, 2026-11-04

Model: whisper.cpp ggml-large-v3-turbo-q5_0 (547 MiB, SHA-1 e050f797... matches the whisper.cpp models README). Audio was downloaded, transcribed and deleted straight away.

| Video | Result |
|---|---|
| nNSl8UQeb_8 | Good. Saved to transcripts/YT_nNSl8UQeb_8.md |
| DyX0QMBfpFA | Good. Saved to transcripts/YT_DyX0QMBfpFA.md |
| FvvuXEPUnGM | Music only (Punjabi song lyrics). No spoken script to recover |
| NU2C0kKdTnw | Music/chant loop ("kar do"). No spoken script to recover |
| ehGzxaUZhVM | Model hallucinated a repeated phrase over music. Treat as no reliable transcript; needs a human check |

Comparison on Reel Dellr6ftrTT (27 s): YouTube's Hindi captions were more accurate ("tool", "joint") than Whisper ("चूल"). Whisper writes some English words in Latin script, which reads closer to real Hinglish. Keep YouTube captions as the first source and Whisper as the fallback.
