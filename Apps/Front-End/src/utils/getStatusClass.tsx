const getStatusClass = (status: string, styles:any) => {
  switch (status) {
    case "ENTREGUE":
      return styles.statusEntregue;
    case "PAID":
      return styles.statusPago;
    case "EM_PREPARAÇÃO":
      return styles.statusPreparo;
       case "CANCELADO":
      return styles.statusCancelado;
      case "SAIU_PARA_ENTREGA":
      return styles.statusSaiuEntrega;
    case "PENDENTE":
    default:
      return styles.statusAndamento;
  }
};

export default getStatusClass