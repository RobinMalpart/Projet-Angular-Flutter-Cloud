import 'package:flutter/material.dart';
import 'package:mobile/components/show_toast.dart';
import 'package:mobile/pages/login_page.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:mobile/components/form_container.dart';
import 'package:logger/logger.dart';

final logger = Logger();

class SignUpPage extends StatefulWidget {
  const SignUpPage({super.key});

  @override
  State<SignUpPage> createState() => _SignUpPageState();
}

class _SignUpPageState extends State<SignUpPage> {

  final FirebaseAuthService _auth = FirebaseAuthService();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    super.dispose();

    _emailController.dispose();
    _passwordController.dispose();
  }

  void _signUp() async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();

    try {
      // Perform the async operation
      final user = await _auth.signUpWithEmailAndPassword(email, password);

      if (!mounted) return;

      if (user != null) {
        showToast(message: "User is successfully created");
        Navigator.pushNamed(context, "/");
      } else {
        showToast(message: "Oops an error occurred!");
      }
    } catch (e) {
      logger.e("Error during sign-up: ${e.toString()}");
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Do it !'),
          backgroundColor: Colors.teal,
          foregroundColor: Colors.white,
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child:
            Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              const Text("Sign up",
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
              const SizedBox(height: 30),
              FormContainerWidget(
                controller: _emailController,
                hintText: "Email",
                isPasswordField: false,
              ),
              const SizedBox(
                height: 10,
              ),
              FormContainerWidget(
                controller: _passwordController,
                hintText: "Password",
                isPasswordField: true,
              ),
              const SizedBox(
                height: 30,
              ),
              GestureDetector(
                onTap:_signUp,
                child: Container(
                    width: double.infinity,
                    height: 45,
                    decoration: BoxDecoration(
                        color: Colors.teal,
                        borderRadius: BorderRadius.circular(10)),
                    child: const Center(
                      child: Text("Signup",
                          style: TextStyle(
                              color: Colors.white, fontWeight: FontWeight.bold)),
                    )),
              ),
              const SizedBox(height: 20, ),
              Row(mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text("Already have an account?"),
                    const SizedBox(width: 5),
                    GestureDetector(
                        onTap: (){
                          Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (context) => const LoginPage()), (route) => false);
                        },
                        child: const Text("Login", style: TextStyle(color: Colors.teal, fontWeight: FontWeight.bold)))]
              )
            ]),
          ),
        ));
  }
}