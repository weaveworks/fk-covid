# FK-Covid

A Firekube distribution for inferencing COVID-19 using COVID-Net.

## Getting Started - Standalone App

We provide several ways to use FK-Covid.
The easiest way is:
  
  * Download our standalone `fk-covid-app` from https://github.com/weaveworks/fk-covid/releases/download/v0.1.0/fk-covid-app,
  * Change it mode to be executable (`chmod +x fk-covid-app`),
  * And run it `fk-covid-app`.

It will bring up a Firekube cluster with all components installed.
Then run `kubectl get svc -n kubeflow` to get IPs for accessing the UI and the object storage.


## Getting Started with Fork-Clone-Run

Please fork this repository, then clone it into your local machine,

    git clone github.com:<your user>/fk-covid

Then run the `setup.sh`

	cd fk-covid
	./setup.sh

## Getting Started with EKS

To use fk-covid on EKS, first please start an EKS cluster with `eksctl`:

	eksctl create cluster eks-covid \
	  --node-type=m5.large \
	  --nodes=2 \
	  --node-volume-size=120 \
	  --region=us-west-2 \
	  --timeout=40m

Then create your GitHub repository to store GitOps configuration. You can do it via the GItHub console, or using this script.
	
	mkdir eks-covid
	cd eks-covid
	git init
	hub create <user>/eks-covid

After you got the EKS cluster running, enable GitOps using the following commands.

	EKSCTL_EXPERIMENTAL=true eksctl \
	    enable repo \
	    --git-url=git@github.com:<user>/eks-covid \
	    --git-email=user@email.com  \
	    --cluster=eks-covid \
	    --region=us-west-2

Then install the COVID ML Profile, which is a portable profile containing all FK-Covid components. 

	EKSCTL_EXPERIMENTAL=true eksctl \
	    enable profile \
	    --git-url=git@github.com:<user>/eks-covid \
	    --git-email=user@email.com \
	    --cluster=eks-covid \
	    --region=us-west-2 \
	    git@github.com:weaveworks/covid-ml-profile

After the profile installed, wait until all PODs ready and FK-Covid can be accessed via URLs retrieved from `kubectl get svc -n kubeflow`.

## Getting Started with AKS

Please create an AKS cluster and install the AKS version of COVID ML Profile from this repo: https://github.com/berndverst/covid-net-azure-profile
