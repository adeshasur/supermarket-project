package com.supermarket.inventory.inventory_service;

import com.supermarket.inventory.inventory_service.data.Inventory; // Correct import
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {

    // Custom method to find stock by product ID
    Optional<Inventory> findByProductId(int productId);
}