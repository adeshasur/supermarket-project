package com.supermarket.inventory.inventory_service.controller;

import com.supermarket.inventory.inventory_service.data.Inventory; // Correct import
import com.supermarket.inventory.inventory_service.service.InventoryService; // Correct import
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

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