import 'package:flutter/material.dart';

class AddTask extends StatelessWidget {
  final TextEditingController controller;
  final VoidCallback onAdd;
  final String? hintText;

  const AddTask({
    super.key,
    required this.controller,
    required this.onAdd,
    this.hintText,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              hintText: hintText ?? "Add a new task",
              hintStyle: const TextStyle(color: Colors.black45),
              filled: true,
              fillColor: Colors.grey.withOpacity(0.35),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: BorderSide.none,
              ),
            ),
          ),
        ),
        const SizedBox(width: 10),
        Container(
          decoration: const BoxDecoration(
            shape: BoxShape.circle,
            color: Colors.lightGreenAccent,
          ),
          child: IconButton(
            icon: const Icon(Icons.add),
            color: Colors.black,
            onPressed: onAdd,
            tooltip: 'Add Task',
          ),
        ),
      ],
    );
  }
}
