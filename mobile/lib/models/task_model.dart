import 'package:cloud_firestore/cloud_firestore.dart';

class TaskModel {
  final String? id;
  String? content;
  bool? done;
  String? userId;
  Timestamp? date;

  TaskModel({this.id, this.content, this.done, this.userId, this.date});

  static TaskModel fromSnapshot(QueryDocumentSnapshot<Map<String, dynamic>> snapshot) {
    return TaskModel(
      id: snapshot.id,
      content: snapshot.data()['content'] ?? "Nothing to do",
      done: snapshot.data()['done'] ?? false,
      userId: snapshot.data()['userId'],
      date: snapshot.data()['date'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      "id": id,
      "content": content,
      "done": done,
      "userId": userId,
      "date": date,
    };
  }
}
