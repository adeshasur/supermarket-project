package com.supermarket.payment_service.service;
import java.util.List;
import java.util.Optional;

import com.supermarket.payment_service.data.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.supermarket.payment_service.repository.PaymentRepository;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public Payment createPayment(Payment payment){ //simuation always completed
        payment.setPaymentStatus("Completed");
        return paymentRepository.save(payment);
    }

    public Optional<Payment> getPayment(Long id){
        return paymentRepository.findById(id);
    }

    public List<Payment> getPaymentByOrderId(Long orderId){
        return paymentRepository.findByOrderId(orderId);
    }

    public Payment updatePayment(Long id, Payment paymentUpdate){
        return paymentRepository.findById(id)
                .map(payment -> {
                    payment.setPaymentStatus(paymentUpdate.getPaymentStatus());
                    payment.setTransactionId(paymentUpdate.getTransactionId());
                    return paymentRepository.save(payment);
                }).orElseThrow(() -> new RuntimeException("Payment not found"));
    }
    public void deletePayment(Long id){
        paymentRepository.deleteById(id);
    }

}
