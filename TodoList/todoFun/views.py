from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import createTodo
from .models import TodoList
import json

# Create your views here.
def home(request):
    if request.method == "POST":
        form = createTodo(request.POST)
        for i in form:
            print()
        if form.is_valid():
            form.save()
        return redirect(home)   
    todos = TodoList.objects.all().values()
    return render(request, "home.html", {"form": createTodo, "todos": todos})

from django.http import JsonResponse

def getData(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body.decode("utf-8"))
            name = data.get('name')
            description = data.get('description')
            newTodo = data.get("newData")
            newDesc = data.get("newDataDes")
            
            if name is None or description is None:
                return JsonResponse({"error": "Invalid data provided."}, status=400)
            
            result = TodoList.objects.filter(todo=name, description=description).update(todo=newTodo, description=newDesc)
            
            if result > 0:
                return JsonResponse({"message": f"Successfully updated"})
            else:
                return JsonResponse({"message": "No matching "})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format."}, status=400)
    return HttpResponse("Hello there, how you doing?")

def deleteData(request):
    if request.method == "POST":
        data = json.loads(request.body.decode("utf-8"))
        result = TodoList.objects.filter(todo=data['name'], description=data['description']).delete()
        return HttpResponse("Successfully deleted")
    return HttpResponse({"Hello there"})
        