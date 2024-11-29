import 'package:flutter/material.dart';
import 'package:mobile/components//show_toast.dart';
import 'package:mobile/pages/signup_page.dart';
import 'package:mobile/components/form_container.dart';
import 'package:mobile/services/auth_service.dart';
import 'package:logger/logger.dart';

final logger = Logger();

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {

  final FirebaseAuthService _auth = FirebaseAuthService();

  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  @override
  void dispose() {
    super.dispose();
    _emailController.dispose();
    _passwordController.dispose();
  }

  void _signIn() async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();

    try {
      final user = await _auth.signInWithEmailAndPassword(email, password);

      if (user != null) {
        if (mounted) {
          Navigator.pushNamed(context, "/toDo");
        }
      } else {
        showToast(message: "Invalid credentials");
      }
    } catch (e) {
      logger.e("Error during sign-in: ${e.toString()}");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Do it !'),
          backgroundColor: Colors.lightGreenAccent,
          foregroundColor: Colors.grey[700],
        ),
        body: Center(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 15),
            child:
            Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              const Text("Login",
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
                onTap: _signIn,
                child: Container(
                    width: double.infinity,
                    height: 45,
                    decoration: BoxDecoration(
                        color: Colors.lightGreenAccent,
                        borderRadius: BorderRadius.circular(10)),
                    child: Center(
                      child: Text("Login",
                          style: TextStyle(
                              fontWeight: FontWeight.bold, color: Colors.grey[700])),
                    )),
              ),
              const SizedBox(height: 20, ),
              Row(mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text("Don't have an account?"),
                    const SizedBox(width: 5),
                    GestureDetector(
                        onTap: (){
                          Navigator.pushAndRemoveUntil(context, MaterialPageRoute(builder: (context) => const SignUpPage()), (route)=>false);
                        },
                        child: const Text("Sign Up", style: TextStyle(color: Colors.teal, fontWeight: FontWeight.bold)))]
              )
            ]),
          ),
        ));
  }
}