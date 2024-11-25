import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';
import 'package:mobile/models/task_model.dart';
import 'package:mobile/services/task_service.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/components/to_do_list.dart';

class ToDo extends StatefulWidget {
  ToDo({super.key});

  @override
  State<ToDo> createState() => _ToDoState();
}

class _ToDoState extends State<ToDo> {
  final _controller = TextEditingController();
  final TaskService _taskService = TaskService();

  void checkBoxChanged(TaskModel task) {
    setState(() {
      task.done = !(task.done ?? false); // Toggle the done status
    });

    // Immediately update Firestore with the new 'done' status
    _taskService.updateData(task);
  }

  void _saveNewTask() {
    if (_controller.text.isNotEmpty) {
      final newTask = TaskModel(
        content: _controller.text,
        done: false,
      );
      _taskService.createData(newTask);
      _controller.clear(); // Clear the input after saving
    } else {
      // Optional: Show a message if the input is empty
      showToast(message: "Please enter a task description");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.deepPurple.shade300,
      appBar: AppBar(
        title: const Text('Simple Todo'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
      ),
      body: StreamBuilder<List<TaskModel>>(
        stream:_taskService.readData(),
        builder: (context, snapshot) {
          // Debug print to confirm if data is received
          debugPrint('Snapshot data: ${snapshot.data}');

          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text("Error: ${snapshot.error}"));
          }
          if (!snapshot.hasData || snapshot.data!.isEmpty) {
            return const Center(child: Text("No Data Available"));
          }

          final toDoList = snapshot.data!;

          return ListView(
            children: toDoList.map((task) {
              return TodoList(
                taskName: task.content ?? "Unnamed Task",
                taskCompleted: task.done ?? false,
                onChanged: (value) => checkBoxChanged(task),
                deleteFunction: (value) => _taskService.deleteTask(task.id!),
              );
            }).toList(),
          );
        },
      ),
      floatingActionButton: Row(
        children: [
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: TextField(
                controller: _controller,
                decoration: InputDecoration(
                  hintText: "Add a new todo item",
                  filled: true,
                  fillColor: Colors.deepPurple.shade200,
                  enabledBorder: OutlineInputBorder(
                    borderSide: const BorderSide(
                      color: Colors.deepPurple,
                    ),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  focusedBorder: OutlineInputBorder(
                    borderSide: const BorderSide(
                      color: Colors.deepPurple,
                    ),
                    borderRadius: BorderRadius.circular(15),
                  ),
                ),
              ),
            ),
          ),
          FloatingActionButton(
            onPressed: _saveNewTask,
            child: const Icon(Icons.add),
          ),
        ],
      ),
    );
  }
}