import styles from "../../styles/Order.module.css";
import {useUserStore}  from "@packages/store/useUserStore";
import AddressForm from "./AddressForm";
import { useOrder } from "../../hooks/useOrder";
import UserForm from "./UserForm";
import OrderSummary from "./OrderSummary";
import { useEffect, useState } from "react";
import { api } from "@packages/api/api";
import type { Address } from "@packages/types/types";
import { toast } from "react-toastify";

export default function Order() {
  const { user } = useUserStore();
  const [enderecos, setEnderecos] = useState<Address[]>([]);
  const [showForm, setShowForm] = useState(false);

  const { handleSubmitOrder } = useOrder();

  const onContinue = async (addressId: number) => {
    if (!user?.id) {
      toast.error("Usuário não identificado. Faça login novamente.");
      return;
    }
    
 
await handleSubmitOrder(Number(user.id), addressId);
  };

  useEffect(() => {
    if (user?.id) {
      api.get(`/address/user/${user.id}`).then((res) => {
        setEnderecos(res.data);
      });
    }
  }, [user]);

  return (
    <section>
      <div className={styles.navIdentificacao}>
        <h1>IDENTIFICAÇÃO</h1>
      </div>

      <article className={styles.checkout}>
        <div className={styles.formSection}>
          {!user ? (
            <UserForm />
          ) : (
            <>
              <p>Olá, {user.nome}</p>

              {enderecos.length > 0 && !showForm ? (
                <>
                  <h3>Escolha um endereço:</h3>
                  <ul className={styles.listaEnderecos}>
                    {enderecos.map((endereco:Address) => (
                      <li key={endereco.id} className={styles.cardEndereco}>
                        <p>
                          {endereco.rua}, {endereco.numero}
                        </p>
                        <p>
                          {endereco.bairro} - {endereco.cidade}
                        </p>
                        <button
                          onClick={() => onContinue(endereco.id)}
                          className={styles.botaoUsarEndereco}
                        >
                          Usar este endereço
                        </button>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setShowForm(true)}
                    className={styles.botaoNovoEndereco}
                  >
                    + Adicionar novo endereço
                  </button>
                </>
              ) : (
                <AddressForm
                  userId={user.id}
                  onContinue={onContinue}
                  setShowForm={setShowForm}
                />
              )}
            </>
          )}
        </div>

        <OrderSummary />
      </article>
    </section>
  );
}