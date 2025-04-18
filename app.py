from flask import Flask, render_template, request
import pandas as pd

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    city_df = pd.read_excel("static/city_data.xlsx")
    roi_df = pd.read_excel("static/product_data.xlsx")
    if request.method == "POST":
        sheet = request.form["sheet"]
        idx = int(request.form["index"])
        field = request.form["field"]
        value = request.form["value"]
        if sheet == "city":
            city_df.at[idx, field] = value
            city_df.to_excel("static/city_data.xlsx", index=False)
        else:
            roi_df.at[idx, field] = value
            roi_df.to_excel("static/product_data.xlsx", index=False)
    return render_template("index.html", cities=city_df.to_dict("records"),
                           headers=list(city_df.columns),
                           products=roi_df.to_dict("records"),
                           prod_headers=list(roi_df.columns))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
