package com.filipecrodrigues.cadastro.services;

import com.filipecrodrigues.cadastro.entities.Empresa;
import com.filipecrodrigues.cadastro.exceptions.NegociosException;
import com.filipecrodrigues.cadastro.repositories.EmpresaRepository;

import org.springframework.stereotype.Service;

import java.util.List;

// Indica que esta classe é um Service (camada de negócio)
@Service
public class EmpresaService {

    // Repositório para acesso ao banco
    private final EmpresaRepository empresaRepository;

    // Injeção de dependência via construtor (melhor prática)
    public EmpresaService(EmpresaRepository empresaRepository) {
        this.empresaRepository = empresaRepository;
    }

    // ===============================
    // CREATE - Cadastrar empresa
    // ===============================
    public Empresa cadastrar(Empresa empresa) {

        // Regra de negócio:
        // Não permitir duas empresas com o mesmo CNPJ
        if (empresaRepository.existsByCnpj(empresa.getCnpj())) {
            throw new NegociosException("CNPJ já cadastrado");
        }

        // Salva no banco
        return empresaRepository.save(empresa);
    }

    // ===============================
    // READ - Listar todas
    // ===============================
    public List<Empresa> listarTodas() {
        return empresaRepository.findAll();
    }

    // ===============================
    // READ - Buscar por ID
    // ===============================
    public Empresa buscarPorId(Long id) {

        // Se não encontrar, lança exceção de negócio
        return empresaRepository.findById(id)
                .orElseThrow(() -> new NegociosException("Empresa não encontrada"));
    }

    // ===============================
    // UPDATE - Atualizar empresa
    // ===============================
    public Empresa atualizar(Long id, Empresa empresaAtualizada) {

        // Busca a empresa existente
        Empresa empresa = buscarPorId(id);

        // Atualiza os campos
        empresa.setCnpj(empresaAtualizada.getCnpj());
        empresa.setRazaoSocial(empresaAtualizada.getRazaoSocial());
        empresa.setNomeFantasia(empresaAtualizada.getNomeFantasia());
        empresa.setAtividadeEconomica(empresaAtualizada.getAtividadeEconomica());
        empresa.setEndereco(empresaAtualizada.getEndereco());
        empresa.setTelefone(empresaAtualizada.getTelefone());

        // Salva as alterações
        return empresaRepository.save(empresa);
    }

    // ===============================
    // DELETE - Excluir empresa
    // ===============================
    public void excluir(Long id) {

        // Garante que a empresa existe antes de excluir
        Empresa empresa = buscarPorId(id);

        empresaRepository.delete(empresa);
    }
}
