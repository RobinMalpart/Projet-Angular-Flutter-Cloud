import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/models/task_model.dart';

class TaskService {
  final CollectionReference taskCollection =
  FirebaseFirestore.instance.collection("task");

  Stream<List<TaskModel>> readData() {
    final userCollection = FirebaseFirestore.instance.collection("task");
    return userCollection.snapshots().map((querySnapshot) =>
        querySnapshot.docs.map((e) => TaskModel.fromSnapshot(e)).toList());
  }

  Future<void> createData(TaskModel toDoModel) async {
    final toDoCollection = FirebaseFirestore.instance.collection("task");
    String id = toDoCollection.doc().id;

    final newTask = TaskModel(
      id: id,
      content: toDoModel.content, // Access `content` from the instance
      done: toDoModel.done, // Access `done` from the instance
    ).toJson();

    try {
      await toDoCollection.doc(id).set(newTask);
      showToast(message: "Data Created Successfully");
    } catch (e) {
      showToast(message: "Failed to Create Data");
    }
  }

  void updateData(TaskModel task) {
    FirebaseFirestore.instance.collection("task").doc(task.id).update({
      "done": task.done,
    }).then((_) {
      print("Updated task ${task.id} with done status: ${task.done}");
    }).catchError((error) {
      print("Failed to update task: $error");
    });
  }

  void deleteTask(String id) {
    // Immediately update Firestore with the new 'done' status
    FirebaseFirestore.instance.collection("task").doc(id).delete().then((_) {
      showToast(message: "Task Deleted Successfully");
    }).catchError((error) {
      showToast(message: "Failed to delete task: $error");
    });
  }
}