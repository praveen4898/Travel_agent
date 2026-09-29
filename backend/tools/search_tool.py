from langchain_core.tools import tool
from langchain_community.tools import DuckDuckGoSearchRun

_search = DuckDuckGoSearchRun()

@tool
def search(query: str) -> str:
    """A wrapper around DuckDuckGo Search. Useful for searching the internet for current events."""
    try:
        return _search.run(query)
    except Exception as e:
        return "DuckDuckGo search failed due to IP rate limits or timeout. Please tell the user you cannot search the web right now and continue with your existing knowledge."
