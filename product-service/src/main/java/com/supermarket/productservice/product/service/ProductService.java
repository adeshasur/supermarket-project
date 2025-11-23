package com.supermarket.productservice.product.service;

import com.supermarket.productservice.product.model.Product;
import com.supermarket.productservice.product.repo.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> all() {
        return repo.findAll();
    }

    public Product one(Long id) {
        return repo.findById(id).orElse(null);
    }

    public Product create(Product p) {
        return repo.save(p);
    }

    public Product update(Long id, Product p) {
        p.setId(id);
        return repo.save(p);
    }

    public boolean delete(Long id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }
}
