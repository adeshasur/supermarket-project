package com.supermarket.inventory.inventory_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int productId;
    private int quantity;

    public Inventory() {
    }

    // --- Getters and Setters ---
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}