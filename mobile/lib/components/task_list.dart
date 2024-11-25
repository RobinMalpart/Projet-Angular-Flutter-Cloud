import 'package:flutter/material.dart';
import 'package:mobile/models/task_model.dart';
import 'package:mobile/components/task.dart';

class TaskList extends StatelessWidget {
  final List<TaskModel> tasks;
  final Function(TaskModel task) onCheckBoxChanged;
  final Function(String taskId) onDeleteTask;

  const TaskList({
    Key? key,
    required this.tasks,
    required this.onCheckBoxChanged,
    required this.onDeleteTask,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: tasks.map((task) {
        return Task(
          taskName: task.content ?? "Unnamed Task",
          taskCompleted: task.done ?? false,
          onChanged: (value) => onCheckBoxChanged(task),
          deleteFunction: (value) => onDeleteTask(task.id!),
        );
      }).toList(),
    );
  }
}
