import React from 'react';


const OrganizationPage = () => {
  return (
    <div>
        <h1 style={{height:'8vh'}}></h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', paddingBottom:"35vh" }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:"space-evenly" }}>
                <img src={require("../assets/HumaneSociety.png")} alt="Humane Society" style={{maxWidth: '13vw'}} />
                <div style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center", }}>
                    <a style={{maxWidth: "50vw", display:"flex", alignItems:"center", justifyContent:"center"}} href="https://secured.humanesociety.org/page/81880/donate/1?ea.tracking.id=ad_gg_animal_charities&en_txn10=ad_gg_cpc_237076442_17383383962_634206280276_animal%20charities&en_og_source=ad_gg_fndr_81880_hsus&utm_source=google&utm_medium=cpc&utm_term=animal%20charities&gclid=CjwKCAiAlp2fBhBPEiwA2Q10D3p1w_FOP2smkC_-DSkFaW6x1CoJaZO5KYTOiNMPXtX0_4PY8zOvHxoCtVwQAvD_BwE" target="_blank" rel="noopener noreferrer">Donate to the Humane Society</a>
                    <p style={{fontSize: "2vh", color: "orange", maxWidth: "50vw"}}>The Humane Society of the United States is the nation's largest and most effective animal protection organization.</p>
                </div>
            </div>
            <space style={{height: '5vh'}}></space>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent:"space-evenly" }}>
                <img src={require("../assets/ASPCA.png")} alt="ASPCA" style={{maxWidth: '13vw'}} />
                <div style={{display: "flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
                    <a style={{maxWidth: "50vw", display:"flex", alignItems:"center", justifyContent:"center"}} href="https://secure.aspca.org/donate/ps-gn-p2?ms=MP_PMK_Googlebrand&initialms=MP_PMK_Googlebrand&pcode=WPSN7GO2PK01&lpcode=WPSN7GO1PK01&test&ds_rl=1066461&gclid=CjwKCAiAlp2fBhBPEiwA2Q10D7qkm8cv2KJAZm3rW9O7iIrcBUP893W--Bxcjur_9e8wzFvsv6376hoC9ZsQAvD_BwE&gclsrc=aw.ds" target="_blank" rel="noopener noreferrer">Donate to the ASPCA</a>
                    <p style={{fontSize: "2vh", color: "orange", maxWidth: "50vw"}}>The American Society for the Prevention of Cruelty to Animals (ASPCA) is a non-profit organization dedicated to preventing animal cruelty.</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default OrganizationPage;
