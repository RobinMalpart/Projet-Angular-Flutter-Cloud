import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/models/task_model.dart';

class TaskService {
  final CollectionReference taskCollection =
      FirebaseFirestore.instance.collection("task");

  Stream<List<TaskModel>> readData() {
    return taskCollection.snapshots().map((querySnapshot) =>
        querySnapshot.docs.map((e) => TaskModel.fromSnapshot(e)).toList());
  }

  Future<void> createData(TaskModel toDoModel) async {
    String id = taskCollection.doc().id;

    final newTask = TaskModel(
      id: id,
      content: toDoModel.content,
      done: toDoModel.done,
    ).toJson();

    try {
      await taskCollection.doc(id).set(newTask);
      showToast(message: "Data Created Successfully");
    } catch (e) {
      showToast(message: "Failed to Create Data");
    }
  }

  void updateData(TaskModel task) {
    taskCollection.doc(task.id).update({
      "content": task.content,
      "done": task.done,
    }).then((_) {
      print("Updated task ${task.id} with content: ${task.content}");
    }).catchError((error) {
      print("Failed to update task: $error");
    });
  }

  void deleteTask(String id) {
    taskCollection.doc(id).delete().then((_) {
      showToast(message: "Task Deleted Successfully");
    }).catchError((error) {
      showToast(message: "Failed to delete task: $error");
    });
  }
}
