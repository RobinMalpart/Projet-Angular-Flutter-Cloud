import 'package:flutter/material.dart';
import 'package:mobile/components/add_task.dart';
import 'package:mobile/models/task_model.dart';
import 'package:mobile/services/task_service.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/components/task_list.dart'; // Import the new TaskList component

class ToDo extends StatefulWidget {
  const ToDo({super.key});

  @override
  State<ToDo> createState() => _ToDoState();
}

class _ToDoState extends State<ToDo> {
  final _controller = TextEditingController();
  final TaskService _taskService = TaskService();

  void checkBoxChanged(TaskModel task) {
    setState(() {
      task.done = !(task.done ?? false);
    });
    _taskService.updateData(task);
  }

  void _saveNewTask() {
    if (_controller.text.isNotEmpty) {
      final newTask = TaskModel(
        content: _controller.text,
        done: false,
      );
      _taskService.createData(newTask);
      _controller.clear();
    } else {
      showToast(message: "Please enter a task description");
    }
  }

  void deleteTask(String taskId) {
    _taskService.deleteTask(taskId);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text('Todo App'),
        backgroundColor: Colors.lightGreenAccent,
        foregroundColor: Colors.black,
      ),
      body: StreamBuilder<List<TaskModel>>(
        stream: _taskService.readData(),
        builder: (context, snapshot) {
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

          // Use the TaskList component
          return TaskList(
            tasks: toDoList,
            onCheckBoxChanged: checkBoxChanged,
            onDeleteTask: deleteTask,
          );
        },
      ),
      floatingActionButton: AddTask(
        controller: _controller,
        onAdd: _saveNewTask,
      ),
    );
  }
}
