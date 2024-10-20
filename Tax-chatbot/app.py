from flask import Flask, render_template, request, jsonify
import os
import google.cloud.logging
from google.cloud import aiplatform
import vertexai

import openai
from google.auth import default, transport
from langchain import PromptTemplate

from langchain_openai import ChatOpenAI


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

import json
import requests



app = Flask(__name__)



PROJECT_ID =  "taxes-test-431012"
# os.environ.get('GCP_PROJECT')
REGION = "us-central1"
# os.environ.get('GCP_REGION')  
BUCKET_NAME = "llama-test1"

client = google.cloud.logging.Client(project=PROJECT_ID)
client.setup_logging()

LOG_NAME = "flask-app-internal-logs"
logger = client.logger(LOG_NAME)

aiplatform.init(project=PROJECT_ID, location=REGION)
vertexai.init(project=PROJECT_ID, location=REGION, staging_bucket=f"gs://{BUCKET_NAME}")
# vertexai.init(project=PROJECT_ID, location=REGION)

credentials, _ = default()
auth_request = transport.requests.Request()
credentials.refresh(auth_request)

MODEL_LOCATION = "us-central1"

client = openai.OpenAI(
    base_url=f"https://{MODEL_LOCATION}-aiplatform.googleapis.com/v1/projects/{PROJECT_ID}/locations/{MODEL_LOCATION}/endpoints/openapi/chat/completions?",
    api_key=credentials.token,
)

MODEL_ID = "meta/llama-3.1-405b-instruct-maas"



project_id = "taxes-test-431012"
location = "global"          
engine_id = "llama-test_1729258392012"
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
                                engine_id = "llama-test_1729258392012",
                                search_query = user_input)
    

    prompt = '''use this information and give detailed explanation if "The provided sources do not contain information about" is present give your own explantion dont say your explantion just give your instead of the source'''
    
#     apply_llama_guard = True 

#     response = client.chat.completions.create(
#     model=MODEL_ID,
#     messages=[
#         {"role": "user", "content": prompt+info},
#     ],
#     extra_body={
#         "extra_body": {
#             "google": {
#                 "model_safety_settings": {
#                     "enabled": apply_llama_guard,
#                     "llama_guard_settings": {},
#                 }
#             }
#         }
#     },

    
# )
    
#     ans = response.choices[0].message.content


    stream = False
    url = "https://proxy.tune.app/chat/completions"
    headers = {
    "Authorization": "sk-tune-E8Igg2HvEadd7niXrCvNHWEOYdKrtbDSBPC",
    "Content-Type": "application/json",
    }
    data = {
  "temperature": 0.8,
    "messages":  [
  {
    "role": "user",
    "content":prompt+info
  },
  
],
    "model": "meta/llama-3.1-70b-instruct",
    "stream": stream,
    "frequency_penalty":  0,
    "max_tokens": 900
    }
    response = requests.post(url, headers=headers, json=data)
    if stream:
        for line in response.iter_lines():
            if line:
                l = line[6:]
                if l != b'[DONE]':
                    print(json.loads(l))
    else:
        print(response.json())


    return response.json()['choices'][0]['message']['content']
    
    # print(info)
    
    # model = GenerativeModel("gemini-1.5-pro-001")

    # prompt = "Here is the information about how to save tax . format it and give 5 points on this and do not recommend any apps"

    # result = model.generate_content(prompt+info)

    # result = result.candidates[0].content.parts[0]._raw_part.text
    
    # print("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    

    # return result


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
    # res = search_sample(project_id = "taxes-test-431012",
    #                     location = "global",          
    #                     engine_id = "llama-test_1729258392012",
    #                     search_query = user_input)
    
    res = generate(user_input)
    # print(res)
    return jsonify(content=str(res))
    

if __name__ == '__main__':
    app.run(debug=True, port=8080, host='0.0.0.0')   