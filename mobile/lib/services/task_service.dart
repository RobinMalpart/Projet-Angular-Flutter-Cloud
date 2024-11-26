import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/models/task_model.dart';

class TaskService {
  final CollectionReference taskCollection =
  FirebaseFirestore.instance.collection("task");

  Stream<List<TaskModel>> readData() {
    return taskCollection.snapshots().map((querySnapshot) {
      return querySnapshot.docs.map((doc) {
        return TaskModel.fromSnapshot(
            doc as QueryDocumentSnapshot<Map<String, dynamic>>);
      }).toList();
    });
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
      showToast(message: "Oops an error occurred!");
    }
  }

  void updateData(TaskModel task) {
    taskCollection.doc(task.id).update({
      "content": task.content,
      "done": task.done,
    }).then((_) {
      showToast(message: "Task Updated Successfully");
    }).catchError((error) {
      showToast(message: "Oops an error occurred!");
    });
  }

  void deleteTask(String id) {
    taskCollection.doc(id).delete().then((_) {
      showToast(message: "Task Deleted Successfully");
    }).catchError((error) {
      showToast(message: "Oops an error occurred!");
    });
  }
}
