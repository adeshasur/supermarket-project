package com.supermarket.user_service.controller;

import com.supermarket.user_service.data.Customer;
import com.supermarket.user_service.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")  // <-- added this line
public class CustomerController {

    @Autowired
    private CustomerService service;

    // CUSTOMER REGISTRATION
    @PostMapping("/customers")
    public Customer registerCustomer(@RequestBody Customer customer) {
        Customer saved = service.registerCustomer(customer);

        if (saved == null) {
            // Email already exists
            return null;
        }

        return saved;
    }

    // CUSTOMER LOGIN
    @PostMapping("/customers/login")
    public Customer loginCustomer(@RequestBody Customer customer) {
        return service.loginCustomer(customer.getEmail(), customer.getPassword());
    }

    @GetMapping(path = "/customers")
    public List<Customer> getAllCustomers() {
        return service.getAllCustomers();
    }

    @GetMapping(path = "/customers/{cid}")
    public Customer getCustomerById(@PathVariable int cid) {
        return service.getCustomerById(cid);
    }

    @PutMapping(path = "/customers")
    public Customer updateCustomer(@RequestBody Customer cname) {
        return service.updateCustomer(cname);
    }

    @DeleteMapping(path = "/customers/{cid}")
    public void deleteCustomer(@PathVariable int cid) {
        service.deleteCustomerById(cid);
    }

    @GetMapping(path = "/customers", params = {"name"})
    public List<Customer> getCustomerByName(@RequestParam String name) {
        return service.getCustomerByName(name);
    }

    @GetMapping(path = "/customers", params = {"email"})
    public Customer getCustomerByEmail(@RequestParam String email) {
        return service.getCustomerByEmail(email);
    }
}
