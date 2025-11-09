package com.supermarket.inventory.inventory_service.service;

import com.supermarket.inventory.inventory_service.InventoryRepository; // Correct import
import com.supermarket.inventory.inventory_service.data.Inventory; // Correct import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepo;

    // Get stock for a product
    public Inventory getInventoryByProductId(int productId) {
        Optional<Inventory> inv = inventoryRepo.findByProductId(productId);
        return inv.orElse(null);
    }

    // Update stock
    public Inventory updateInventory(Inventory inventoryItem) {
        Optional<Inventory> existingInv = inventoryRepo.findByProductId(inventoryItem.getProductId());

        if (existingInv.isPresent()) {
            // It exists, so update the quantity
            Inventory inv = existingInv.get();
            inv.setQuantity(inventoryItem.getQuantity());
            return inventoryRepo.save(inv);
        } else {
            // It's new, just save it
            return inventoryRepo.save(inventoryItem);
        }
    }
}