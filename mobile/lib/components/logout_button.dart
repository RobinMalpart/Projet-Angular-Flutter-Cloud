import 'package:flutter/material.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:logger/logger.dart';

class LogoutButton extends StatelessWidget {
  final FirebaseAuthService _auth = FirebaseAuthService();
  final Logger logger = Logger();

  LogoutButton({Key? key}) : super(key: key);

  void _logout(BuildContext context) async {
    try {
      await _auth.signOut();
      Navigator.pushNamedAndRemoveUntil(context, '/login', (route) => false);
      showToast(message: "Logged out successfully!");
    } catch (e) {
      logger.e("Error during logout: ${e.toString()}");
      showToast(message: "Logout failed. Please try again.");
    }
  }

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.logout),
      tooltip: 'Logout',
      onPressed: () => _logout(context),
    );
  }
}
