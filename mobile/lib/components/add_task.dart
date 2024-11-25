import 'package:flutter/material.dart';

class AddTask extends StatelessWidget {
  final TextEditingController controller;
  final VoidCallback onAdd;

  const AddTask({
    super.key,
    required this.controller,
    required this.onAdd,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: TextField(
              controller: controller,
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
          onPressed: onAdd,
          child: const Icon(Icons.add),
        ),
      ],
    );
  }
}
