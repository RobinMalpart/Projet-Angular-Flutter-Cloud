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
          child: Padding(
            padding: const EdgeInsets.only(left: 40, right: 20),
            child: TextField(
              controller: controller,
              decoration: InputDecoration(
                border: InputBorder.none, // Remove visible border
                filled: true,
                fillColor: Colors.grey.withOpacity(0.35),
                hintStyle: const TextStyle(color: Colors.black45),
                hintText: hintText ?? "Add a new task",
                enabledBorder: OutlineInputBorder(
                  borderSide: BorderSide.none,
                  borderRadius: BorderRadius.circular(10),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: BorderSide.none,
                  borderRadius: BorderRadius.circular(10),
                ),
              ),
            ),
          ),
        ),
        FloatingActionButton(
          backgroundColor: Colors.lightGreenAccent,
          foregroundColor: Colors.black,
          onPressed: onAdd,
          child: const Icon(Icons.add),
        ),
      ],
    );
  }
}
