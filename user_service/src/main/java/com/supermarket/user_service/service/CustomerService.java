package com.supermarket.user_service.service;

import com.supermarket.user_service.data.Customer;
import com.supermarket.user_service.data.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository cRepo;

    public List<Customer> getAllCustomers() {
        return cRepo.findAll();
    }

    public Customer getCustomerById(int cid) {
        Optional<Customer> c = cRepo.findById(cid);
        if (c.isPresent()) {
            return c.get();
        }
        return null;
    }

    public Customer saveCustomer(Customer cname) {
        return cRepo.save(cname);
    }

    public Customer updateCustomer(Customer cname) {
        return cRepo.save(cname);
    }

    public void deleteCustomerById(int cid) {
        cRepo.deleteById(cid);
    }

    public List<Customer> getCustomerByName(String name) {
        return cRepo.findCustomerByName(name);
    }

    public Customer getCustomerByEmail(String email) {
        return cRepo.findCustomerByEmail(email);
    }

    //Customer Login
    public Customer loginCustomer(String email, String password) {
        Customer c = cRepo.findCustomerByEmail(email);
        if (c != null && c.getPassword().equals(password)) {
            return c; // login success
        }
        return null; // login fail
    }
}
