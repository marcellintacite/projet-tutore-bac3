"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Tspan,
  PDFViewer,
} from "@react-pdf/renderer";
import logo from "../../../../../public/assets/illustration/jpr.png";
import { ResponseCertificatDeces } from "@/types/Certificat";

const Quixote = ({ data }: { data: ResponseCertificatDeces }) => {
  const dateOption = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  console.log(data);
  return (
    <Document
      title={`
    certificat decès de ${data.Certificat.nom_defunt} ${data.Certificat.post_nom_defunt}     

    `}
    >
      <Page style={styles.body}>
        <View style={styles.congo}>
          <Image
            src={window.location.origin + "/assets/illustration/jpr.png"}
            style={styles.image}
          />
          <Image
            src={window.location.origin + "/assets/illustration/drapeau.png"}
            style={styles.image}
          />
        </View>

        <View style={styles.head}>
          <Text style={styles.title}>REPUBLIQUE DEMOCRATIQUE DU CONGO</Text>
          <Text style={styles.author}>
            {data.hospital.denom.toLocaleUpperCase()}
          </Text>
          <Text style={styles.author}>{data.hospital.email}</Text>
          <Text style={styles.author}>
            BP {data.hospital.boite_postal} | {data.terriville.denom}
          </Text>

          <View style={styles.absolute}>
            <Image
              style={styles.image}
              source={
                "https://presidence.cd/uploads/a771e9a5d17203f8712c8f01c3fdc473.png"
              }
            />
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.sub}>
            CERTIFICAT DE DECES No {data.Certificat.id}
          </Text>
          <Text style={styles.normal}>
            Je soussigné, Dr. {data.Certificat.medecin_traitant} , médecin
            traitant à l'hopital de {data.hospital.denom} , avoir suivi en
            hospitalisation,{" "}
            {data.Certificat.sexe_defunt === "m" ? "Monsieur" : "Madame"}{" "}
            {data.Certificat.nom_defunt} {data.Certificat.post_nom_defunt}{" "}
            agé(e) de{" "}
            {new Date().getFullYear() -
              new Date(
                data.Certificat.date_naissance_defunt
              ).getFullYear()}{" "}
            ans et qui résidait à {data.terriville.denom}{" "}
          </Text>
          <Text style={styles.suite}>
            Il est décédé en date du{" "}
            {new Date(data.Certificat.date_desc).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            suite à {data.Certificat.cause_desc}.
          </Text>
          <Text style={styles.suite}>
            Le présent certificat est délivré à l'intéressé pour servir et
            valoir ce que de droit.
          </Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.normal}>
            Fait à Bukavu, le{" "}
            {new Date(data.Certificat.date_deliv_cert).toLocaleDateString(
              "fr-FR",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </Text>

          <View style={styles.sceau}>
            <Text style={styles.normalBold}>Sceau</Text>
            <Text style={styles.normalBold}>Signature</Text>
          </View>
        </View>
        {data.Certificat.url_qrcode && (
          <View style={styles.code}>
            <View style={styles.imgContainer}>
              <Text style={styles.normalBold}>Code QR</Text>
              <Image
                style={styles.imageQrcode}
                source={`https://projetutor.onrender.com${data.Certificat.url_qrcode}`}
              />
            </View>
          </View>
        )}
        <View style={styles.foot}>
          <Text style={styles.header} fixed>
            ~ Certificat de décès ~
          </Text>
        </View>
      </Page>
    </Document>
  );
};

Font.register({
  family: "Oswald",
  src: "https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    position: "relative",
  },
  congo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#eaf4ff",
    padding: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Oswald",
    marginVertical: 10,
    marginTop: 45,
    fontWeight: "bold",
  },
  sub: {
    color: "#000",
    fontWeight: "extrabold",
    textAlign: "center",
    fontFamily: "Oswald",
    marginBottom: 20,
    textDecoration: "underline",
  },
  head: {
    position: "relative",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  author: {
    fontSize: 14,

    fontFamily: "Times-Roman",
    textAlign: "center",
    marginBottom: 8,
    textDecoration: "underline",
  },

  text: {
    margin: 12,
    fontSize: 15,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    width: 50,
  },
  header: {
    fontSize: 12,

    textAlign: "center",
    color: "#7d7879",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },

  content: {
    marginTop: 40,
  },
  footer: {
    marginTop: 60,
  },
  sceau: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 35,
  },

  normal: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    marginBottom: 3,
  },
  normalBold: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    fontWeight: "bold",
    marginBottom: 3,
  },
  suite: {
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
    marginBottom: 10,
  },

  foot: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: "#eaf4ff",
    padding: 10,
  },
  imgContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 10,
    padding: 10,
    border: "1px solid #000",
    borderRadius: 5,
    width: 200,
  },
  imageQrcode: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  code: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginTop: 25,
  },
});

export default Quixote;
