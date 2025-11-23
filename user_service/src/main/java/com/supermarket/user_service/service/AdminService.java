package com.supermarket.user_service.service;

import com.supermarket.user_service.data.AdminRepository;
import com.supermarket.user_service.data.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository aRepo;

    // ADMIN LOGIN
    public Admin loginAdmin(String email, String password) {
        Admin admin = aRepo.findAdminByEmail(email);

        if (admin != null && admin.getPassword().equals(password)) {
            return admin; // login success
        }

        return null; // login failed
    }

    public List<Admin> getAllAdmins(){
        return aRepo.findAll();
    }

    public Admin getAdminById(int aid) {
        Optional<Admin> a = aRepo.findById(aid);
        if (a.isPresent()) {
            return a.get();
        }
        return null;
    }

//   public Admin saveAdmin(Admin aname){
//        return aRepo.save(aname);
//    }

    public Admin updateAdmin(Admin aname){
        return  aRepo.save(aname);
    }

    public void deleteAdminById(int id) {
        aRepo.deleteById(id);
    }

    public Admin getAdminByEmail(String email) {
        return aRepo.findAdminByEmail(email);
    }

}
