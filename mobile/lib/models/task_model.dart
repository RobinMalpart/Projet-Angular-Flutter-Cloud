import 'package:cloud_firestore/cloud_firestore.dart';

class TaskModel {
  final String? id;
  String? content;
  bool? done;
  String? userId;

  TaskModel({this.id, this.content, this.done, this.userId});

  static TaskModel fromSnapshot(QueryDocumentSnapshot<Map<String, dynamic>> snapshot) {
    return TaskModel(
      id: snapshot.id,
      content: snapshot.data()['content'] ?? "Nothing to do",
      done: snapshot.data()['done'] ?? false,
      userId: snapshot.data()['userId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "content": content,
      "done": done,
      "userId": userId
    };
  }
}