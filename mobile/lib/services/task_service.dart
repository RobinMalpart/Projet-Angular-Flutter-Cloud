import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/models/task_model.dart';

class TaskService {
  final CollectionReference taskCollection =
  FirebaseFirestore.instance.collection("task");

  Stream<List<TaskModel>> readData() {
    final user = FirebaseAuth.instance.currentUser;

    if (user == null) {
      return Stream.value([]);
    }

    String userId = user.uid;

   return taskCollection
        .where('userId', isEqualTo: userId)
        .snapshots()
        .map((querySnapshot) {
      return querySnapshot.docs.map((doc) {
        return TaskModel.fromSnapshot(
            doc as QueryDocumentSnapshot<Map<String, dynamic>>);
      }).toList();
    });
  }

  Future<void> createData(TaskModel toDoModel) async {
    final user = FirebaseAuth.instance.currentUser;
    if (user == null) {
      showToast(message: "User is not authenticated!");
      return;
    }

    String id = taskCollection.doc().id;
    String userId = user.uid;

    final newTask = TaskModel(
      id: id,
      content: toDoModel.content,
      done: toDoModel.done,
      userId: userId,
    ).toJson();

    try {
      await taskCollection.doc(id).set(newTask);
      showToast(message: "Data Created Successfully");
    } catch (e) {
      showToast(message: "Oops, an error occurred!");
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
