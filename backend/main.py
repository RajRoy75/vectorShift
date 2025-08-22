# /backend/main.py

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Set

from fastapi.middleware.cors import CORSMiddleware

class Node(BaseModel):
    id: str

class Edge(BaseModel):
    source: str
    target: str

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

app = FastAPI()

origins = [
    "*" 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"], # Allow all headers
)


def is_dag_util(
    node_id: str,
    adjacency_list: Dict[str, List[str]],
    visited: Set[str],
    recursion_stack: Set[str]
) -> bool:
    visited.add(node_id)
    recursion_stack.add(node_id)
    for neighbor in adjacency_list.get(node_id, []):
        if neighbor not in visited:
            if is_dag_util(neighbor, adjacency_list, visited, recursion_stack):
                return True
        elif neighbor in recursion_stack:
            return True
    recursion_stack.remove(node_id)
    return False

def check_is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    if not nodes:
        return True
    adjacency_list: Dict[str, List[str]] = {node.id: [] for node in nodes}
    for edge in edges:
        adjacency_list[edge.source].append(edge.target)
    visited: Set[str] = set()
    recursion_stack: Set[str] = set()
    for node in nodes:
        if node.id not in visited:
            if is_dag_util(node.id, adjacency_list, visited, recursion_stack):
                return False
    return True

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    is_dag = check_is_dag(pipeline.nodes, pipeline.edges)
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag,
    }
