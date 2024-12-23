import 'package:flutter/material.dart';
import 'package:logger/logger.dart';
import 'package:mobile/components/add_task.dart';
import 'package:mobile/models/task_model.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:mobile/services/task_service.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/components/task_list.dart';

var logger = Logger();

class ToDo extends StatefulWidget {
  const ToDo({super.key});

  @override
  State<ToDo> createState() => _ToDoState();
}

class _ToDoState extends State<ToDo> {
  final TextEditingController _controller = TextEditingController();
  final TaskService _taskService = TaskService();
  TaskModel? _currentTask;

  void checkBoxChanged(TaskModel task) {
    setState(() {
      task.done = !(task.done ?? false);
    });
    _taskService.updateData(task);
  }

  void _saveNewTask() {
    if (_controller.text.isNotEmpty) {
      if (_currentTask != null) {
        _currentTask!.content = _controller.text;
        _taskService.updateData(_currentTask!);
        setState(() {
          _currentTask = null;
        });
      } else {
        final newTask = TaskModel(
          content: _controller.text,
          done: false,
        );
        _taskService.createData(newTask);
      }
      _controller.clear();
    } else {
      showToast(message: "Please enter a task description");
    }
  }

  void deleteTask(String taskId) {
    _taskService.deleteTask(taskId);
  }

  void updateTask(TaskModel task) {
    setState(() {
      _currentTask = task;
      _controller.text = task.content ?? "";
    });
  }

  void _logout(BuildContext context) async {
    final FirebaseAuthService authService = FirebaseAuthService();
    try {
      await authService.signOut();
      if (context.mounted) {
        Navigator.pushNamedAndRemoveUntil(context, '/', (route) => false);
      }
    } catch (e) {
      logger.e('An error occurred while logging out: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        automaticallyImplyLeading: false,
        title: const Text('Do it!'),
        backgroundColor: Colors.lightGreenAccent,
        foregroundColor: Colors.grey[700],
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            tooltip: 'Logout',
            onPressed: () => _logout(context),
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            Expanded(
              child: StreamBuilder<List<TaskModel>>(
                stream: _taskService.readData(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  if (snapshot.hasError) {
                    return Center(child: Text("Error: ${snapshot.error}"));
                  }
                  if (!snapshot.hasData || snapshot.data!.isEmpty) {
                    return const Center(
                      child: Text(
                        "No tasks available. Add a new task!",
                        style: TextStyle(color: Colors.grey),
                      ),
                    );
                  }

                  final toDoList = snapshot.data!;

                  return TaskList(
                    tasks: toDoList,
                    onCheckBoxChanged: checkBoxChanged,
                    onDeleteTask: deleteTask,
                    onUpdateTask: updateTask,
                  );
                },
              ),
            ),
            const Divider(height: 1),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: AddTask(
                controller: _controller,
                onAdd: _saveNewTask,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
