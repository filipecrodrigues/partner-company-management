package com.filipecrodrigues.cadastro.exceptions;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

// Indica que esta classe intercepta exceções
// de TODOS os controllers da aplicação
@RestControllerAdvice
public class GlobalExceptionHandler {

    // ===============================
    // ERROS DE REGRA DE NEGÓCIO
    // ===============================

    // Captura NegociosException lançada no Service
    @ExceptionHandler(NegociosException.class)
    public ResponseEntity<Map<String, Object>> handleBusinessException(
            NegociosException ex) {

        // Corpo da resposta de erro
        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", HttpStatus.BAD_REQUEST.value());
        error.put("error", "Regra de negócio violada");
        error.put("message", ex.getMessage());

        // Retorna HTTP 400
        return ResponseEntity.badRequest().body(error);
    }

    // ===============================
    // ERROS DE VALIDAÇÃO (@Valid)
    // ===============================

    // Captura erros de validação da entidade
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(
            MethodArgumentNotValidException ex) {

        Map<String, Object> errors = new HashMap<>();

        // Extrai campo + mensagem de erro
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        Map<String, Object> response = new HashMap<>();
        response.put("timestamp", LocalDateTime.now());
        response.put("status", HttpStatus.BAD_REQUEST.value());
        response.put("errors", errors);

        // Retorna HTTP 400
        return ResponseEntity.badRequest().body(response);
    }

    // ===============================
    // ERRO GENÉRICO (fallback)
    // ===============================

    // Captura QUALQUER exceção não tratada
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(
            Exception ex) {

        Map<String, Object> error = new HashMap<>();
        error.put("timestamp", LocalDateTime.now());
        error.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
        error.put("error", "Erro interno do servidor");
        error.put("message", "Ocorreu um erro inesperado");

        // Logaria o erro em produção
       // ex.printStackTrace();

        // Retorna HTTP 500
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
