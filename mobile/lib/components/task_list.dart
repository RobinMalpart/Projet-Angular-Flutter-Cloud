import 'package:flutter/material.dart';
import 'package:mobile/models/task_model.dart';
import 'package:mobile/components/task.dart';

class TaskList extends StatelessWidget {
  final List<TaskModel> tasks;
  final Function(TaskModel task) onCheckBoxChanged;
  final Function(String taskId) onDeleteTask;
  final Function(TaskModel task) onUpdateTask;

  const TaskList({
    super.key,
    required this.tasks,
    required this.onCheckBoxChanged,
    required this.onDeleteTask,
    required this.onUpdateTask,
  });

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: tasks.length,
      itemBuilder: (context, index) {
        final task = tasks[index];
        return Task(
          taskName: task.content ?? "Unnamed Task",
          taskCompleted: task.done ?? false,
          onChanged: (value) => onCheckBoxChanged(task),
          deleteFunction: (value) => onDeleteTask(task.id!),
          updateFunction: (value) => onUpdateTask(task),
        );
      },
    );
  }
}
