package com.supermarket.user_service.controller;

import com.supermarket.user_service.data.Admin;

import com.supermarket.user_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AdminController {

    @Autowired
    private AdminService service;

    // ADMIN LOGIN
    @PostMapping("/admins/login")
    public Admin loginAdmin(@RequestBody Admin admin) {
        return service.loginAdmin(admin.getEmail(), admin.getPassword());
    }

    @GetMapping(path = "/admins")
    public List<Admin> getAllAdmins() {
        return service.getAllAdmins();
    }

    @GetMapping(path = "/admins/{id}")
    public Admin getAdminById(@PathVariable("id") int aid) {
        return service.getAdminById(aid);
    }

//    @PostMapping(path = "/admins")
//    public Admin createAdmin(@RequestBody Admin aname) {
//        return service.saveAdmin(aname);
//    }

    @PutMapping(path = "/admins")
    public Admin updateAdmin(@RequestBody Admin aname) {
        return service.updateAdmin(aname);
    }

    @DeleteMapping(path = "/admins/{id}")
    public void deleteAdmin(@PathVariable("id") int id) {
        service.deleteAdminById(id);
    }

    @GetMapping(path = "/admins", params = "email")
    public Admin getAdminByEmail(@RequestParam String email) {
        return service.getAdminByEmail(email);
    }
}
