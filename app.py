import gradio as gr
import subprocess
import json
import data
from transformers import AutoTokenizer, AutoModelForCausalLM, LlamaTokenizer
import torch
from dotenv import load_dotenv

token = load_dotenv("/Users/jessiehsu/microloan-website/keys.env")

def run_ollama(model, prompt):
    """Runs Ollama with the given model and prompt."""
    try:
        process = subprocess.Popen(
            ["ollama", "run", model, prompt],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            return f"Error: {stderr}"
        else:
            return stdout

    except FileNotFoundError:
        return "Error: Ollama not found. Make sure it's installed and in your PATH."
    except Exception as e:
        return f"An unexpected error occurred: {e}"

def generate_text(model, prompt):
    """Processes the output from Ollama for a more readable format."""
    raw_output = run_ollama(model, prompt)

    cleaned_output = raw_output.strip()

    # Remove the last line if it is only a prompt indicator e.g. ">>>"
    lines = cleaned_output.split('\n')
    if len(lines) > 0 and (lines[-1].startswith('>>>') or lines[-1].startswith('>')):
        cleaned_output = '\n'.join(lines[:-1])

    return cleaned_output

def create_gradio_interface():
    """Creates a Gradio interface for interacting with Ollama."""
    # model_path = "/Users/jessiehsu/Downloads/llama2-gptq-finetuned"
    # tokenizer = AutoTokenizer.from_pretrained(f"{model_path}-token")

    # model = AutoModelForCausalLM.from_pretrained(
    #     model_path,
    #     device_map="auto",
    #     torch_dtype=torch.float16
    # )
    
    ''' 
    model_path ="meta-llama/Llama-2-7b-chat"
    # tokenizer = LlamaTokenizer.from_pretrained(model_path)
    model = AutoModelForCausalLM.from_pretrained(
        model_path,
        device_map="auto",
        token = token,
        # torch_dtype=torch.float16
    )
    '''

    models = ["llama3.2", "mistral", "codellama", "llama2:7b", "mistral:instruct", "codellama:7b"]

    iface = gr.Interface(
        fn=generate_text,
        inputs=[
            gr.Dropdown(models, label="Model"),
            gr.Textbox(lines=5, label="Prompt"),
        ],
        outputs=gr.Textbox(lines=10, label="Response"),
        title="Ask me for financial advice!",
    )
    return iface

if __name__ == "__main__":
    iface = create_gradio_interface()
    iface.launch(share=True)