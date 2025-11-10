package com.supermarket.inventory.inventory_service.controller;

import com.supermarket.inventory.inventory_service.data.Inventory;
import com.supermarket.inventory.inventory_service.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List; // Make sure this is imported

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // --- NEW ENDPOINT ---
    // API: Get ALL stock items
    @GetMapping("/all")
    public List<Inventory> getAllInventory() {
        return inventoryService.getAllInventory();
    }
    // --- END NEW ENDPOINT ---

    // API: Get stock by product ID
    @GetMapping("/{productId}")
    public Inventory getInventoryByProductId(@PathVariable int productId) {
        return inventoryService.getInventoryByProductId(productId);
    }

    // API: Update stock
    @PostMapping
    public Inventory updateInventory(@RequestBody Inventory inventoryItem) {
        return inventoryService.updateInventory(inventoryItem);
    }
}