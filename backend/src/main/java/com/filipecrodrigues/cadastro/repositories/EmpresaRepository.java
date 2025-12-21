package com.filipecrodrigues.cadastro.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.filipecrodrigues.cadastro.entities.Empresa;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {

    // Verifica se existe empresa com o CNPJ informado
    boolean existsByCnpj(String cnpj);

}
