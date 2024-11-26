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
                hintText: hintText ?? "Add a new task",
                hintStyle: const TextStyle(
                  color: Colors.white,
                ),
                filled: true,
                fillColor: Colors.grey[400],
                enabledBorder: OutlineInputBorder(
                  borderSide: const BorderSide(
                    color: Colors.teal,
                  ),
                  borderRadius: BorderRadius.circular(15),
                ),
                focusedBorder: OutlineInputBorder(
                  borderSide: const BorderSide(
                    color: Colors.teal,
                  ),
                  borderRadius: BorderRadius.circular(15),
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
