from handler import home, summarize_text, status

def setup_routes(app):
    app.add_url_rule("/", "home", home, methods=["GET"])
    app.add_url_rule("/summarize", "summarize_text", summarize_text, methods=["POST"])
    app.add_url_rule("/status", "status", status, methods=["GET"])
