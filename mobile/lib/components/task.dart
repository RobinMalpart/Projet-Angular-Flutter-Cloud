import 'package:flutter/material.dart';

class Task extends StatelessWidget {
  const Task({
    super.key,
    required this.taskName,
    required this.taskCompleted,
    required this.onChanged,
    this.deleteFunction,
  });

  final String taskName;
  final bool taskCompleted;
  final Function(bool?)? onChanged;
  final Function(BuildContext)? deleteFunction;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(
        top: 20,
        left: 20,
        right: 20,
        bottom: 0,
      ),
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: Colors.teal,
          borderRadius: BorderRadius.circular(15),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Checkbox(
                  value: taskCompleted,
                  onChanged: onChanged,
                  checkColor: Colors.black,
                  activeColor: Colors.white,
                  side: const BorderSide(
                    color: Colors.white,
                  ),
                ),
                Text(
                  taskName,
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 18,
                    decoration: taskCompleted
                        ? TextDecoration.lineThrough
                        : TextDecoration.none,
                    decorationColor: Colors.white,
                    decorationThickness: 2,
                  ),
                ),
              ],
            ),
            Container(
              alignment: Alignment.centerRight,
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: const Icon(Icons.update, color: Colors.white),
                    onPressed: () {
                      if ( != null) updateFunction!(context);
                    },
                    tooltip: 'Update Task',
                  ),
                  const SizedBox(width: 8), // Add spacing
                  IconButton(
                    icon: const Icon(Icons.delete, color: Colors.white),
                    onPressed: () {
                      if (deleteFunction != null) deleteFunction!(context);
                    },
                    tooltip: 'Delete Task',
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}