package com.supermarket.payment_service.data;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "order_id", nullable = false)
    private Long orderId;

    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "payment_date")
    private LocalDateTime paymentDate;

    public Payment() {}
    //construstor
    public Payment(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Payment(Long orderId, Double amount, String paymentStatus, LocalDateTime paymentDate) {
        this.orderId = orderId;
        this.amount = amount;
        this.paymentStatus = paymentStatus;
        this.paymentDate = paymentDate;
    }

    //getters setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}
