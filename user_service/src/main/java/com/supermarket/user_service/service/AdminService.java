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

    public Admin saveAdmin(Admin aname){
        return aRepo.save(aname);
    }

    public Admin updateAdmin(Admin aname){
        return  aRepo.save(aname);
    }

    public void deleteAdminById(int cid) {
        aRepo.deleteById(cid);
    }

    public Admin getAdminByEmail(String email) {
        return aRepo.findAdminByEmail(email);
    }

    //Admin login
    public Admin loginAdmin(String email, String password) {
        Admin a = aRepo.findAdminByEmail(email);
        if (a != null && a.getPassword().equals(password)) {
            return a;
        }
        return null;
    }
}
