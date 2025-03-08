from flask import request, jsonify
from transformers import pipeline
from config import MODEL_NAME

# Load model
summarizer = pipeline("summarization", model=MODEL_NAME)

# Handler /
def home():
    return jsonify({"message": "API is running!"})

# Handler /summarize
def summarize_text():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "Text is required"}), 400

    # Adaptive config
    max_length = int(1.5 * len(text.split()))
    min_length = int(0.2 * len(text.split()))

    summary = summarizer(
        text,
        max_length=max_length,
        min_length=min_length,
        length_penalty=0.7,
        num_beams=4,
        do_sample=True,
        temperature=1.0,
        top_k=100,
        top_p=0.9
    )
    print(f"Input text: {text}")
    return jsonify({"summary": summary[0]['summary_text']})

# Handler /status
def status():
    return jsonify({"status": "ok"}), 200
