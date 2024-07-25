![Logo (3)](https://github.com/matheusapostulo/HealthLearning/assets/73514316/2ae2f621-6a1a-44cf-8329-1cef6b2ed3d3)

# HEALTHLEARNING
Um website que utiliza ciência de dados e aprendizagem de máquina para fornecer informações relativas à saúde.

# ANÁLISE DO PROJETO
## Funcionamento Geral
De modo geral, o website irá ter seções referentes à orgãos/parte do corpo para a fácil orientação do usuário nas MODELOS das doenças e afins. Exemplo: O usuário deseja obter informações relacionadas à doenças do coração, então, irá ter uma catergoria "Coração" em que ele poderá visualizar páginas de determinadas doenças com modelos de machine learning + dados referente à essa doença selecionada.  
Além disso, existem outros funcionamento ligados ao usuário que são importantes já citar, como por exemplo, o usuário poder favoritar/salvar os resultados da análise de machine learning no seu perfil, comentar/discutir análises, trocar mensagens, ver em sua home MODELOS em que seus amigos estão participando. Ou seja, dito isso, a ideia de melhor caso seria uma criação de rede social referente à área.

## Principais Atividades
Ainda dando enfoque e se aprofundando no usuário, para simplificar, iremos listar as atividades que os usuários poderão fazer no site.  
> ### Usuário  
* Visualizar "MODELOS" de doenças e afins
* Obter um resultado nos modelos de machine learning nas MODELOS
* Favoritar/Salvar e comentar "MODELOS"
* Visualizar perfis 
* Editar perfil
* Fazer amizade

## Levantamento de Requisitos
> 01. VISUALIZAR MODELOS
> 02. AVALIAÇÃO MACHINE LEARNING
> 03. VISUALIZAR PERFIS 
> 04. FAVORITAR MODELOS
> 05. COMENTAR MODELOS
> 06. EDITAR PERFIL
> 07. FAZER AMIZADE 
> 08. MANDAR MENSAGEM PRIVADA 


#### VISUALIZAR MODELOS
|   RF001  | VISUALIZAR MODELOS |
| --- | --- |
| NÚMERO DO REQUISITO| 1 |
| DESCRIÇÃO | O usuário poderá visualizar as MODELOS de determinada categoria(parte corpo) que ele selecionou na home/index. Essa resenha terá diversas informaçoes e um espaço para submeter informações e obter uma classificação de um modelo de machine learning. |
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Selecionar uma resenha em meio outras na categoria escolhida. |
| ESFORÇO (PARA DESENVOLVER) | Médio |
| RELEVÂNCIA (PARA NEGÓCIO) | Alta |
| RISCO (PARA O PROJETO) | Alta |
***
#### AVALIAÇÃO MACHINE LEARNING
|   RF002]   | AVALIAÇÃO ML |
| --- | --- |
| NÚMERO DO REQUISITO| 2 |
| DESCRIÇÃO | O usuário irá submeter seus dados para receber uma resposta do algoritmo de Machine Learning. |
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Ter entrado em uma resenha [RF001] e submetido os dados. |
| ESFORÇO (PARA DESENVOLVER) | Alta |
| RELEVÂNCIA (PARA NEGÓCIO) | Alta |
| RISCO (PARA O PROJETO) | Alta |
***
#### VISUALIZAR PERFIS
|   RF003   | VISUALIZAR PERFIS |
| --- | --- |
| NÚMERO DO REQUISITO| 3|
| DESCRIÇÃO | O usuário poderá visualizar o perfil de outros usuários e conseguirá ver o que ele favoritou, suas classificações obtidas pelos modelos de machine learning e dados referente à sua saúde. | 
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Estar em uma resenha [RF001] para poder visualizar os perfis que interagiram com ela. |
| ESFORÇO (PARA DESENVOLVER) | Médio |
| RELEVÂNCIA (PARA NEGÓCIO) | Média |
| RISCO (PARA O PROJETO) | Média |
***
#### FAVORITAR MODELOS
|   RF004   | FAVORITAR MODELOS |
| --- | --- |
| NÚMERO DO REQUISITO| 4 |
| DESCRIÇÃO | O usuário poderá favoritar as MODELOS em que ele está visualizando ou até mesmo na categoria, favoritando a resenha, ele salva em seu perfil. | 
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Possuir uma conta no site. |
| ESFORÇO (PARA DESENVOLVER) | Baixo | 
| RELEVÂNCIA (PARA NEGÓCIO) | Baixo |
| RISCO (PARA O PROJETO) | Baixo | 
***
#### COMENTAR MODELOS
|   RF005   | COMENTAR MODELOS |
| --- | --- |
| NÚMERO DO REQUISITO| 5 |
| DESCRIÇÃO | O usuário poderá comentar as MODELOS. | 
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Possuir uma conta no site e estar na página da resenha. |
| ESFORÇO (PARA DESENVOLVER) | Baixo | 
| RELEVÂNCIA (PARA NEGÓCIO) | Baixo |
| RISCO (PARA O PROJETO) | Baixo | 
***
#### EDITAR PERFIL
|   RF006   | EDITAR PERFIL |
| --- | --- |
| NÚMERO DO REQUISITO| 6 |
| DESCRIÇÃO | O usuário poderá editar suas informações pessoais e informações referentes à sua saúde. | 
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Ter um perfil criado. |
| ESFORÇO (PARA DESENVOLVER) | Baixo/Médio | 
| RELEVÂNCIA (PARA NEGÓCIO) | Médio |
| RISCO (PARA O PROJETO) | Baixo | 
***
#### FAZER AMIZADE
|   RF007   | FAZER AMIZADE |
| --- | --- |
| NÚMERO DO REQUISITO| 7 |
| DESCRIÇÃO | O usuário poderá fazer amizade para deixar salvo o perfil de outro usuário, ter ele como amigo permitirá que ele veja as discussões que o outro usuáro estará participando. | 
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Visualizar um perfil [RF003] |
| ESFORÇO (PARA DESENVOLVER) | Baixo | 
| RELEVÂNCIA (PARA NEGÓCIO) | Baixo |
| RISCO (PARA O PROJETO) | Baixo | 
***

#### MENSAGEM PRIVADA
|   RF008   | MENSAGEM PRIVADA |
| --- | --- |
| NÚMERO DO REQUISITO | 9 |
| DESCRIÇÃO | O usuário conseguirá se comunicar com os outros usuários. | 
| CLASSIFICAÇÃO | Requisito Funcional. |
| DEPENDÊNCIAS | Ter feito amizades [RF007] |
| ESFORÇO (PARA DESENVOLVER) | Médio | 
| RELEVÂNCIA (PARA NEGÓCIO) | Baixo |
| RISCO (PARA O PROJETO) | Baixo | 
***


# PROJETO
## Casos de Uso
![image](https://user-images.githubusercontent.com/73514316/217074028-1a1e126a-95c5-499a-aa79-32937b74255f.png)

## Especificação dos casos de uso 

### Especificação | UC001 - Editar Perfil
|    | Editar Perfil |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário poderá editar seu perfil com suas informações pessoais e informações referentes à saúde. |
| Complexidade | Médio | 
| Pré-Condições | Usuário tem que estar logado em uma conta existente e na página do perfil do usuário. |
| Pós-Condições | Terá sua conta editada com sucesso e poderá ver suas alterações |
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário clica no botão de editar perfil na página do perfil do usuário | 2. Sistema permite que usuário edite suas informações |
| 3. Usuário edita as informações que deseja alterar e clica em salvar | 4. Sistema processa e salva as alterações no banco de dados <br> 5. Sistema apresenta uma tela/pop-up informando que as alterações foram salvas <br> | 

#### Fluxo Alternativo - Passo 3 - Usuário digita informações inválidas
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
|  | 4. Sistema informa que há campos/informações inválidas e pede para que o cliente reinsira as informações de forma correta |
| 5. Usuário edita as informações que deseja alterar de forma certa e clica em salvar | 6. Continua no passo 4 |





### Especificação | UC002 - Favoritar Resenha 
|    | Favoritar Resenha |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário poderá favoritar as MODELOS e as MODELOS vão para o perfil. |
| Complexidade | Baixa | 
| Pré-Condições | Usuário tem que estar logado (para a resenha ir para o perfil). |
| Pós-Condições | A resenha irá para a área de "MODELOS favoritadas" no perfil do usuário. |
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário estará na página da resenha e clicará no botão de favoritar | 2. O sistema irá armazenar a resenha no perfil do usuário <br> 3. O sistema irá marcar o estilo da área do "favoritar" <br> |



### Especificação | UC003 - Visualizar resenha depois 
|    | Visualizar resenha depois |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário poderá salvar as MODELOS para visualizar depois, as MODELOS estarão no seu perfil. |
| Complexidade | Baixa | 
| Pré-Condições | Usuário tem que estar logado (para a resenha ir para o perfil). |
| Pós-Condições | A resenha irá para a área de "Avaliar/ler depois" no perfil do usuário. |
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário estará na área de MODELOS de uma categoria | 2. O sistema irá armazenar a resenha no perfil do usuário(área de "Ler depois") <br> 3. O sistema irá marcar o estilo da área do "ler depois" <br> |

#### Fluxo Alternativo - Passo 1 - Usuário já se encontra na página da resenha 
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário já estará na página da resenha que ele quer marcar par ver depois | Continua no passo 2 |



### Especificação | UC004 - Comentar MODELOS 
|    | Comentar MODELOS |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário poderá comentar as MODELOS e deixar esse comentário visível para todos na resenha. |
| Complexidade | Baixa | 
| Pré-Condições | Usuário tem que estar logado e na página da resenha. |
| Pós-Condições | O comentário será exibido na página da resenha. |
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário escreve um comentário no campo de comentários e clicar em "Fazer comentário. | 2. Sistema salva o comentário no banco de dados daquela página. <br> 3. Sistema exibe sem a necessidade de refresh o comentário na página da resenha. <br> |




### Especificação | UC005 - Obter resultado ML
|    | Obter resultado ML |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário poderá submeter seus dados e receber um resultado do algoritmo de Machine Learning daquela resenha. |
| Complexidade | Alta | 
| Pré-Condições | Usuário tem que estar logado e na página da resenha. |
| Pós-Condições | Ao final da resenha, o usuário poderá salvar o resultado em seu perfil e até permitir que seus amigos vejam o resultado em seus feeds. |
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário submeterá seus dados no "forms" e clicará no botão de "Realizar teste". |  2. O sistema irá mandar os dados submetidos ao algoritmo de machine learing <br> 3. Enquanto é feito o processo, o sistema irá exibir algo na tela para avisar que o "cálculo" está sendo feito <br> 4. Após ter o resultado, o sistema mostrará ele para o usuário <br> |
| 5. Com o resultado em mãos, o cliente pode salvar o resultado em seu perfil ou/e compartilha-lo no feed de seus amigos. |


#### Fluxo Alternativo - Passo 2 - Usuário digita um valor incoerente e errado
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
|  |  2. Sistema avisa que há dados errados e marca as boxes que estão erradas. <br> 3. Continua no passo 1 <br>|


#### Fluxo Alternativo - Passo 2 - Usuário não digita todo os dados necessários
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
|  |  2. Sistema avisa faltam dados e marca as boxes que estão precisando de dados. <br> 3. Continua no passo 1 <br> |




### Especificação | UC006 Enviar Solicitação de Amizade
|    | Enviar Solicitação de Amizade |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário poderá enviar uma solicitação de amizade. |
| Complexidade | Baixa | 
| Pré-Condições | Usuário tem que estar logado e estar visualizando um perfil. |
| Pós-Condições | A solicitação vai para o perfil da pessoa que foi solicitada. |
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário clica no botão de enviar solicitação para determinado usuário. | 2. Sistema armazena a solicitação e envia para o usuário solicitado <br> 3. Sistema envia um aviso para o usuário que a solicitação foi enviada com sucesso. <br> 4. Sistema faz a solicitação ficar pendente |


### Especificação | UC007 Aceitar solicitação de amizade 
|    | Aceitar solicitação de amizade |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário terá acesso à uma lista de solicitações de amizade e poderá negar ou aceitar. |
| Complexidade | Média | 
| Pré-Condições | Usuário tem que estar logado e ter recebido solicitações. |
| Pós-Condições | A resposta da solicitação vai para a pessoa que solicitou. 
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário clica em aceitar solicitação. | 2. Sistema registra a relação feita entre os usuários <br> 3. Sistema envia um aviso para as notificações do usuário solicitante que a solicitação feita foi aceita <br> |

#### Fluxo Alternativo - Passo 1 - Usuário recusa solicitação
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário clica em recusar solicitação. | 2. Sistema não permite que o usuário solicitante possa enviar mais solicitações por X tempo <br> |




### Especificação | UC008 Mandar mensagens privadas
|    | Mandar mensagens privadas |
| --- | --- |
| Atores | Principal: Usuário |
| Sumário | O usuário poderá mandar mensagens para os usuários. |
| Complexidade | Média | 
| Pré-Condições | Cliente tem que estar logado e visualizando um perfil. |
| Pós-Condições | A mensagem será encaminhada para o usuário. | 
| Pontos de inclusão | Não Há |
| Pontos de exclusão | Não Há |
***
#### Fluxo Principal
| Ações do Ator | Ações do Sistema |  
|         ---     |        ---         |  
| 1. O usuário clica no botão de chat. | 2. Sistema abre o chat para o usuário (na mesma tela) |
| 3. Usuário digita mensagem para o usuário | 4. Sistema ?guarda mensagem? e envia mensagem para o usuário <br> 5. Sistema mostra o registo de mensagens para ambos os usuários. <br> |


## Requisitos Gerados Posteriormente
### Requisitos
> 01. COMPARTILHAR AVALIAÇÃO ML COM AMIGOS
> 02. SALVAR AVALIAÇÃO ML NO PERFIL
> 03. ACEITAR SOLICITAÇÃO


## MVP que será produzido 
> 1. CRIAR CONTA
> 2. PESQUISAR MODELOS
> 3. VISUALIZAR MODELOS
> 4. AVALIAÇÃO MACHINE LEARNING
> 5. FAVORITAR MODELOS
> 6. EDITAR PERFIL


## Protótipos de tela
### Paleta de cores
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/35a763d5-c505-438e-8581-a641174b990e)


### Fazer Login
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/059b85be-5653-471b-aaf9-ee5fed7cdb83)

### Criar Conta
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/30e8d857-8a99-4f73-a88d-9d70faf4d950)

### Edtar perfil (Perfil Público, Gerenciamento da conta
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/38249b80-f8a2-4de1-bf54-612b891fbf73)
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/fc9e78a9-4ea2-448c-a51e-333bc733aaac)

### Home (sem conta)
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/a9836910-4763-4af5-b5f9-6a96d2863896)

### Home (com conta)
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/5113f60f-1299-4d62-abfa-c36250523c06)

### Pesquisa
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/db2b56aa-bb4c-4418-bf4b-163c5a5ab68c)

### Todos Modelos
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/b07bf2ca-7f6d-4185-b483-07937bbb252d)

### Modelo
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/3cda3c8d-afc1-40f8-8df5-2f2de318fd3b)

## Diagrama de Classes

## Diagramas de Sequência

## Anotações 
- Email vai ser a chave primária do usuário? (um usuário atualizar o email tem que alterar em tabelas que utilizam esse campo como chave)  
- A senha será armazenada por hash
- Fazer verificações nos campos, ex.: máximo de caracteres permitidos.
- Aprender a fazer a consulta **sem chave estrangeira no banco de dados**.
- Considerar mudar de coração para estrela nos favoritos, e ao invés de "curtidos" para "favoritados" no nome.


# IMPLEMENTAÇÃO
## Arquitetura
Nossa arquitetura basicamente vai ser xxx
A seguir temos a figura do esquema da arquitetura do sistema:

## Banco de Dados
O banco de dados utilizado será o MongoDB. Isso se deve pela característica dos nossos Modelos, que terão atributos diferentes entre eles. Além disso, até aqui, as consultas que serão exigidas se mostraram relativamente simples, e, além disso, não necessitaremos de Transações.

### Banco de Dados físico e hospedagem 
O Banco vai ser hospedado no Atlas do MongoDB já que mudamos para um banco de dados não relacional!

**Favoritos**  
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/513397b9-b184-42a0-9719-2ee149ee0cc5)

**Modelo**  
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/7b33bb22-9a61-41f7-957d-aa629af46c46)

**Usuario**  
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/784788b0-9c3a-4152-b75b-03ab2af6c5f7)

**Resultado**  
![image](https://github.com/matheusapostulo/HealthLearning/assets/73514316/8ec2ea67-ec8c-4dc2-94fc-4efa8832c577)


# TESTE



