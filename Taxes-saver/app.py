from flask import Flask, render_template, request, jsonify
import os
import google.cloud.logging
from google.cloud import aiplatform
import vertexai
import re
from flask_cors import CORS

from vertexai.generative_models import (
    GenerativeModel,
    GenerationResponse,
    Tool,
    grounding,
)
from vertexai.preview.generative_models import grounding as preview_grounding
from IPython.display import display, Markdown

from typing import List

from google.api_core.client_options import ClientOptions
from google.cloud import discoveryengine_v1 as discoveryengine



app = Flask(__name__)
CORS(app)

PROJECT_ID = os.environ.get('GCP_PROJECT') 
REGION = os.environ.get('GCP_REGION')  

client = google.cloud.logging.Client(project=PROJECT_ID)
client.setup_logging()

LOG_NAME = "flask-app-internal-logs"
logger = client.logger(LOG_NAME)

aiplatform.init(project=PROJECT_ID, location=REGION)
vertexai.init(project=PROJECT_ID, location=REGION)



project_id = "taxes-test-431012"
location = "global"          
engine_id = "tax-save_1723042920551"
search_query = ""



def search_sample(
    project_id: str,
    location: str,
    engine_id: str,
    search_query: str,
) -> List[discoveryengine.SearchResponse]:
    client_options = (
        ClientOptions(api_endpoint=f"{location}-discoveryengine.googleapis.com")
        if location != "global"
        else None
    )

    client = discoveryengine.SearchServiceClient(client_options=client_options)

    serving_config = f"projects/{project_id}/locations/{location}/collections/default_collection/engines/{engine_id}/servingConfigs/default_config"

    content_search_spec = discoveryengine.SearchRequest.ContentSearchSpec(
        snippet_spec=discoveryengine.SearchRequest.ContentSearchSpec.SnippetSpec(
            return_snippet=True
        ),
        summary_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec(
            summary_result_count=5,
            include_citations=True,
            ignore_adversarial_query=True,
            ignore_non_summary_seeking_query=True,
            model_prompt_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec.ModelPromptSpec(
                preamble="YOUR_CUSTOM_PROMPT"
            ),
            model_spec=discoveryengine.SearchRequest.ContentSearchSpec.SummarySpec.ModelSpec(
                version="stable",
            ),
        ),
    )

    request = discoveryengine.SearchRequest(
        serving_config=serving_config,
        query=search_query,
        page_size=10,
        content_search_spec=content_search_spec,
        query_expansion_spec=discoveryengine.SearchRequest.QueryExpansionSpec(
            condition=discoveryengine.SearchRequest.QueryExpansionSpec.Condition.AUTO,
        ),
        spell_correction_spec=discoveryengine.SearchRequest.SpellCorrectionSpec(
            mode=discoveryengine.SearchRequest.SpellCorrectionSpec.Mode.AUTO
        ),
    )

    response = client.search(request)

    print(response.summary.summary_text)

    return response.summary.summary_text


def generate(user_input):
    info = res = search_sample(project_id = "taxes-test-431012",
                                location = "global", 
                                engine_id = "tax-save_1723042920551",
                                search_query = user_input)
    
    model = GenerativeModel("gemini-1.5-pro-001")

    prompt = "Here is the information about how to save tax . format it and give 5 points on this and do not recommend any apps"

    result = model.generate_content(prompt+info)

    result = result.candidates[0].content.parts[0]._raw_part.text
    
    # print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    

    return result




@app.route('/')
def index():
    return render_template('index.html')

@app.route('/palm2', methods=['GET', 'POST'])
def vertex_palm():
    user_input = ""
    if request.method == 'GET':
        user_input = request.args.get('user_input')
    else:
        user_input = request.form['user_input']

    
    
    search_query = user_input
    res = search_sample(project_id = "taxes-test-431012",
                        location = "global",          
                        engine_id = "tax-save_1723042920551",
                        search_query = user_input)
    
    res = generate(user_input)
    print(res)
    return jsonify(content=str(res))
    

if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')