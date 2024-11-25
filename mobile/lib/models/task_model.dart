import 'package:cloud_firestore/cloud_firestore.dart';

class TaskModel {
  final String? id;
  final String? content;
  bool? done;

  TaskModel({this.id, this.content, this.done});

  static TaskModel fromSnapshot(DocumentSnapshot<Map<String, dynamic>> snapshot) {
    return TaskModel(
      id: snapshot.id,
      content: snapshot.data()?['content'] ?? "Nothing to do",
      done: snapshot.data()?['done'] ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "content": content,
      "done": done
    };
  }
}